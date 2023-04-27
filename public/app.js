const app = new Vue({
    el: '#app',
    data:{
        url: "",
        slug: "",
        created: null,
    },
    methods: {
        async createUrl(){
            const res = await fetch('/url' , {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: this.url,
                    slug: this.slug,
                })
            });

            let get = await res.json()
            this.created = `${window.location.href + get.slug} now redirectong to ${get.url}`


        }
    }
})