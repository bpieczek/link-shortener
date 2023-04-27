const app = new Vue({
  el: "#app",
  data: {
    url: "",
    slug: "",
    created: null,
  },
  methods: {
    async createUrl() {
      const res = await fetch("/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug,
        }),
      });

      let get = await res.json();
      if (!get.slug && !get.url) {
        let sp = document.querySelector("#url-error");
        sp.innerHTML = get.message;

        sp.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 700,
          iterations: 1,
          fill: "forwards",
        });

        setTimeout(() => {
          sp.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 700,
            iterations: 1,
            fill: "forwards",
          });
        }, 3700);

        return;
      }

      this.created = `${window.location.href + get.slug}`;
    },
    copyLink() {
      let copyText = document.querySelector("#finalUrl");

      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
    },
  },
});
