define(["window", "algorithm_view"], (window, algorithm_view)=>{

    return function active_instances() {

        var algorithm_views = [];
        var active_algoritms = [];
        var self = this;

        this.proceed = () => { 
            var new_active = [];
            for(var i = 0 ; i < active_algoritms.length ; i++) {
                var algorithm = active_algoritms[i];
                if(algorithm.proceed()) {
                    new_active.push(algorithm);
                }
            }
            active_algoritms = new_active;
            return active_algoritms.length != 0;
        }
        this.add_algorithm = (algorithm) => {

            var id = algorithm.id();

            algorithm_views[id] = new algorithm_view(window.add_instance(id), algorithm, self);

            active_algoritms.push(algorithm);

        }
        this.render_all = () => {
            for(var id in algorithm_views) {
                var algorithm_view = algorithm_views[id];
                algorithm_view.render();
            }
        }
    }

});