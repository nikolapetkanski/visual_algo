define(["window", "algorithm_view"], (window, algorithm_view)=>{

    return function active_instances() {

        var algorithm_views = {};
        var active_algoritms = {};
        var self = this;

        this.proceed_all = () => { 
            var new_active = {};
            var active = 0;
            for(var id in active_algoritms) {
                var algorithm = active_algoritms[id];
                if(algorithm.proceed()) {
                    active++;
                    new_active[id] = algorithm;
                }
            }
            active_algoritms = new_active;
            return active != 0;
        }
        this.proceed = (id) => {
            if(algorithm = active_algoritms[id]) {
                if(!algorithm.proceed()) {
                    delete active_algoritms[id];
                } else {
                    return true;
                }
            } else {
                throw "illegal state";
            }
            return false;
        }
        this.add_algorithm = (algorithm) => {

            var id = algorithm.id();

            var view = new algorithm_view(window.add_instance(id), algorithm, self);

            view.on_step_over(()=>{
                self.proceed(id);
                self.render(id);
            })

            algorithm_views[id] = view;

            active_algoritms[id] = algorithm;

            self.render(id);

        }
        this.render_all = () => {
            for(var id in algorithm_views) {
                var algorithm_view = algorithm_views[id];
                algorithm_view.render();
            }
        }
        this.render = (id) => {
            if(algorithm_view = algorithm_views[id]) {
                algorithm_view.render();
            }
        }
    }

});