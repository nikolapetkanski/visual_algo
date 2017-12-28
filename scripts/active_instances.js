define(["window"], (window)=>{

    return function active_instances() {

        var algorithms = [];
        var active_algoritms = [];

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
            algorithms.push(algorithm);
            active_algoritms.push(algorithm);
        }
        this.render = () => {

            var render_elements = [];

            for(var i = 0 ; i < algorithms.length ; i++) {
                var algorithm = algorithms[i];
                
                render_elements.push({
                    svg_id: algorithm.svg_id(),
                    svg_width: algorithm.svg_width(),
                    svg_height: algorithm.svg_height(),
                    svg_elements: algorithm.svg_elements()
                });
            }

            window.render(render_elements);
        }
    }

});