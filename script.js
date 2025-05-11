// 新規ファイル: script.js

document.addEventListener("DOMContentLoaded", () => {
  /**
   * ヘッダーの制御
   */
  // スクロール時のヘッダー背景透過度変更
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.9)";
      header.style.boxShadow = "none";
    }
  });

  // モバイルメニューの制御
  const menuBtn = document.querySelector(".header__menu-btn");
  const nav = document.querySelector(".header__nav");
  let isMenuOpen = false;

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        nav.style.display = "block";
        menuBtn.classList.add("active");

        // メニューボタンのスパンを×に変形
        menuBtn.querySelector("span:nth-child(1)").style.transform =
          "rotate(45deg) translate(5px, 5px)";
        menuBtn.querySelector("span:nth-child(2)").style.opacity = "0";
        menuBtn.querySelector("span:nth-child(3)").style.transform =
          "rotate(-45deg) translate(7px, -7px)";
      } else {
        nav.style.display = "none";
        menuBtn.classList.remove("active");

        // メニューボタンを元に戻す
        menuBtn.querySelector("span:nth-child(1)").style.transform = "none";
        menuBtn.querySelector("span:nth-child(2)").style.opacity = "1";
        menuBtn.querySelector("span:nth-child(3)").style.transform = "none";
      }
    });
  }

  /**
   * アニメーション効果の制御
   */
  // Intersection Observer API を使用して要素が表示されたときにアニメーションを開始
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.3 }
  );

  // ズームイン効果の要素
  document.querySelectorAll(".zoom-in").forEach((el) => io.observe(el));

  // サークル表示効果の要素
  document.querySelectorAll(".reveal-center").forEach((el) => io.observe(el));

  /**
   * NCSの強みセクションのアニメーション
   */
  const strengthsSection = document.querySelector("#strengths");
  if (strengthsSection) {
    // スクロールで表示されたときのアニメーション
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // セクション全体の表示アニメーション
            entry.target.classList.add("animate-section");

            // 内部要素のアニメーション
            const elements = entry.target.querySelectorAll(
              ".p-index_first__head__textarea, .p-index_first__pic, .p-index_first__en"
            );
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-element");
              }, 300 * index);
            });

            // 監視を解除
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    io.observe(strengthsSection);
  }

  /**
   * サービスセクションのアニメーション
   */
  const serviceSections = document.querySelectorAll(".p-index_feature__sec");
  if (serviceSections.length > 0) {
    const serviceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;

            // 左右から中央に入るアニメーション
            const isEvenSection =
              Array.from(serviceSections).indexOf(section) % 2 === 1;
            section.classList.add(
              isEvenSection ? "animate-from-right" : "animate-from-left"
            );

            // 内部要素のアニメーション（遅延付き）
            const elements = section.querySelectorAll(
              ".p-index_feature__sec__num, .c-catch01, .textarea, .pic"
            );
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-service-element");
              }, 200 * index);
            });

            // カードのアニメーション
            const cards = section.querySelectorAll(".sub-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-card");
              }, 600 + 150 * index);
            });

            // 監視を解除
            serviceObserver.unobserve(section);
          }
        });
      },
      { threshold: 0.15 }
    );

    serviceSections.forEach((section) => {
      serviceObserver.observe(section);
    });
  }

  /**
   * FAQアコーディオン機能
   */
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");

    question.addEventListener("click", () => {
      // すでに開いている項目があれば閉じる
      const currentActive = document.querySelector(".faq__item.active");
      if (currentActive && currentActive !== item) {
        currentActive.classList.remove("active");
      }

      // クリックされた項目の開閉状態を切り替え
      item.classList.toggle("active");
    });
  });

  /**
   * お問い合わせフォームの処理
   */
  const contactForm = document.getElementById("contactForm");
  const zipButton = document.querySelector(".zip-group button");

  // 郵便番号検索ボタンのイベント処理
  if (zipButton) {
    zipButton.addEventListener("click", () => {
      const zipInput = document.querySelector(".zip-group input");
      if (zipInput && zipInput.value) {
        // 実際には郵便番号検索APIを呼び出す処理を実装
        alert(
          `郵便番号「${zipInput.value}」から住所を検索します。実際の実装ではAPIを使用します。`
        );
      } else {
        alert("郵便番号を入力してください。");
      }
    });
  }

  // お問い合わせフォームのバリデーションとサブミット処理
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // 簡易バリデーション
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "#e74c3c";
          field.style.backgroundColor = "rgba(231, 76, 60, 0.05)";
        } else {
          field.style.borderColor = "#ccc";
          field.style.backgroundColor = "";
        }
      });

      // メールアドレスのバリデーション
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = "#e74c3c";
          emailField.style.backgroundColor = "rgba(231, 76, 60, 0.05)";
        }
      }

      // フォーム送信処理
      if (isValid) {
        // ここに実際の送信処理またはAPIコール
        alert("お問い合わせありがとうございます。近日中にご連絡いたします。");
        contactForm.reset();
      } else {
        alert("必須項目を入力してください。");
      }
    });

    // フォーム入力時のバリデーションリセット
    contactForm.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("input", () => {
        field.style.borderColor = "#ccc";
        field.style.backgroundColor = "";
      });
    });
  }

  /**
   * スムーススクロール
   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        // モバイルメニュー開いている場合は閉じる
        if (isMenuOpen) {
          nav.style.display = "none";
          menuBtn.classList.remove("active");
          menuBtn.querySelector("span:nth-child(1)").style.transform = "none";
          menuBtn.querySelector("span:nth-child(2)").style.opacity = "1";
          menuBtn.querySelector("span:nth-child(3)").style.transform = "none";
          isMenuOpen = false;
        }

        // ヘッダーの高さを考慮してスクロール位置を調整
        const headerHeight = header.offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /**
   * レスポンシブ対応
   */
  const resizeHandler = () => {
    // 画面サイズが変わった時にモバイルメニューの表示状態をリセット
    if (window.innerWidth > 768 && nav) {
      nav.style.display = "";
      if (menuBtn) {
        menuBtn.classList.remove("active");
        menuBtn.querySelector("span:nth-child(1)").style.transform = "none";
        menuBtn.querySelector("span:nth-child(2)").style.opacity = "1";
        menuBtn.querySelector("span:nth-child(3)").style.transform = "none";
      }
      isMenuOpen = false;
    }
  };

  window.addEventListener("resize", resizeHandler);

  /**
   * 既存のアニメーションロジック
   */
  // すべてのアニメーション要素に'is-act'クラスを設定
  const animElements = document.querySelectorAll(".js-anim_elm");
  animElements.forEach((element) => {
    element.classList.add("is-act");
  });

  // スクロールでのアニメーション
  window.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".js-anim_elm:not(.is-act)");
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight * 0.9) {
        element.classList.add("is-act");
      }
    });
  });

  // js-split クラスのテキスト分割アニメーション
  document.querySelectorAll(".js-split").forEach((element) => {
    if (!element.classList.contains("initialized")) {
      const spans = element.querySelectorAll("span");
      spans.forEach((span, index) => {
        span.style.transitionDelay = `${index * 0.1}s`;
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";

        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        }, 100 + index * 100);
      });

      element.classList.add("initialized");
    }
  });
});
