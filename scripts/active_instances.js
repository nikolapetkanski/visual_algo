define(["window"], (window)=>{

    return function active_instances() {

        var algorithms = [];

        this.proceed = () => { 
            return false;
        }
        this.add_algorithm = (algorithm) => {
            algorithms.push(algorithm);
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