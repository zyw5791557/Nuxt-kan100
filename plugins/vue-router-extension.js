import Vue from 'vue';

export default ({ app }, inject) => {
    app.router.beforeEach((to, from, next) => {
        const list = ["index", "MovieView", "TeleplayView", "ShowView", "AnimeView", "StarView", "FunnyView", "NewsView", "SpecialView"];
        const toName = to.name;
        const fromName = from.name;
        const toIndex = list.indexOf(toName);
        const fromIndex = list.indexOf(fromName);
        let direction = '';

        if(toIndex > -1 && fromIndex > -1) {
            if(toIndex < fromIndex) {
                direction = 'left';
            } else {
                direction = 'right';
            }
        }
        app.store.commit('SET_VIEW_DIRECTION', direction);
        console.log(from.name,to.name);
        return next();
    })
}