define(["algorithm_config"], function() 
{

    function algorithm_config()
    {

        var algorithms_list_ = null;

        this.set_algorithms_list = function(algorithms_list)
        {
            algorithms_list_ = algorithms_list;
        }

        var d3_ = null;

        this.set_d3 = function(d3)
        {
            d3_ = d3;
        }

        var on_algorithm_selected_cb_ = null;

        this.set_on_algorithm_selected = function(cb) {
            on_algorithm_selected_cb_ = cb;
        }

        function on_select()
        {

            var selected_algorithm = d3_.select("#algorithm_list").property("value");
            var data_input = d3_.select("input").property("value");

            on_algorithm_selected_cb_(selected_algorithm,data_input);
        }

        function show_algorithms_list(cfg) 
        {
            var selection = cfg
                .append("div")
                .attr("id", "selection")
                .attr("class", "config_section");

            selection.append("span")
                    .text("Algorithm");

            var list = selection
                .append("select")
                .attr("id", "algorithm_list");

            for(var i = 0 ; i < algorithms_list_.length ; i++)
            {
                list.append("option")
                    .text(algorithms_list_[i]);
            }

        }

        function show_data_input(cfg)
        {
            var input = cfg
                .append("div")
                .attr("id", "input")
                .attr("class", "config_section");

            input.append("span")
                    .text("Numbers separated by comma");

            var elements = input
                .append("input")
                .attr("id", "elements")
                .property("value", "3,8,7,6,9,5,4,1,2");

        }

        function show_select_button(cfg)
        {
            var button = cfg
                .append("div")
                .attr("id", "input")
                .attr("class", "config_section");

            button
                .append("button")
                .text("Select")
                .on("click", on_select);

        }

        this.show = function() 
        {
            var cfg = d3_
                .select("body")
                .append("div")
                .attr("id", "algorithm_config");

            show_algorithms_list(cfg);
            show_data_input(cfg);
            show_select_button(cfg);

        }

        this.hide = function()
        {
            d3_.select("#algorithm_config").remove();
        }

    }

    var algorithm_config_ = new algorithm_config();

    return algorithm_config_;
});