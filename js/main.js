/* ============================================================
   Social Action Marche — スクリプト
   （設定は js/config.js にまとまっています）
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.SITE_CONFIG || {};

  /* ---------- 申込みフォームCTAの切り替え ----------
     config.formUrl にURLが入っていれば、
     全CTAボタンを「Coming Soon」から本物のリンクに切り替える */
  const ctaButtons = document.querySelectorAll(".js-form-cta");
  if (config.formUrl) {
    ctaButtons.forEach((btn) => {
      btn.setAttribute("href", config.formUrl);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
      btn.removeAttribute("aria-disabled");
      btn.removeAttribute("tabindex");
      btn.innerHTML =
        '<span class="btn__spark">✦</span>' +
        (config.formButtonText || "参加申込みはこちら！") +
        '<span class="btn__spark">✦</span>';
    });
  }

  /* ---------- 開催日カウントダウン ---------- */
  const countdownEl = document.getElementById("countdown");
  const daysEl = document.getElementById("countdownDays");
  if (countdownEl && daysEl && config.eventDate) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const event = new Date(config.eventDate + "T00:00:00");
    const diffDays = Math.round((event - today) / 86400000);

    if (diffDays > 0) {
      daysEl.textContent = diffDays;
      countdownEl.hidden = false;
    } else if (diffDays === 0) {
      countdownEl.innerHTML = "🎪 本日開催！ぜひ潮風公園へ！";
      countdownEl.hidden = false;
    }
    /* 開催後は非表示のまま */
  }

  /* ---------- スマホ用メニュー ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("globalNav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      document.body.classList.toggle("is-menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    });
    /* メニュー内リンクを押したら閉じる */
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        document.body.classList.remove("is-menu-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- スクロールで要素をふわっと表示 ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- スマホ用追従CTA（ヒーローを過ぎたら表示） ---------- */
  const stickyCta = document.getElementById("stickyCta");
  const hero = document.querySelector(".hero");
  if (stickyCta && hero && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const show = !entry.isIntersecting;
          stickyCta.classList.toggle("is-visible", show);
          stickyCta.setAttribute("aria-hidden", show ? "false" : "true");
        });
      },
      { threshold: 0.05 }
    );
    heroObserver.observe(hero);
  }

  /* ---------- フッターの年号 ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
