define(["user_output/user_interface", 
"user_output/graphical_model"], 
function(user_interface, graphical_model){


    function user_interface()
    {
        var d3_ = null;

        this.set_d3 = function(d3)
        {
            d3_ = d3;
            graphical_model.set_d3(d3_);
        }

        this.set_IE_interface = function(ie)
        {
            graphical_model.set_IE_interface(ie);
        }

        var on_step_forward_cb_ = null;

        this.set_on_step_forward = function(cb)
        {
            on_step_forward_cb_ = cb;
        }

        var on_start_cb_ = null;

        this.set_on_start = function(cb)
        {
            on_start_cb_ = cb;
        }

        var on_stop_cb_ = null;

        this.set_on_stop = function(cb)
        {
            on_stop_cb_ = cb;
        }

        var on_restart_cb_ = null;

        this.set_on_restart = function(cb)
        {
            on_restart_cb_ = cb;
        }

        this.get_draw_interface = function()
        {
            return this;
        }

        function new_button(parent, text) {
            var button = parent.append("button")
                .attr("class", "material-icons control_button")
                .style("font-size", "12px")
                .text(text);
            return button;
        }

        var control_view_ = null;

        function setup_control()
        {

            new_button(control_view_, 'clear');

            new_button(control_view_, 'replay')
                    .on("click", on_restart_cb_);

            new_button(control_view_, 'forward')
                    .attr("id", "forward_button")
                    .on("click", on_step_forward_cb_);

            new_button(control_view_, 'play_arrow')
                    .on("click", on_start_cb_);

        }

        this.show = function()
        {
           var main_view = d3_
                .select("body")
                .append("div")
                .attr("id", "main_view")
                .attr("class", "algorithm_window");

            var model_view = main_view
                .append("div")
                .attr("id", "model_view")
                .attr("class", "algorithm_view_component")
                .style("display", "inline-block")
                .style("height", "70%");

            var source_view = main_view
                .append("div")
                .attr("id", "source_view")
                .attr("class", "algorithm_view_component")
                .style("display", "inline-block")
                .style("height", "30%")
                .style("width", "60%")
                .style("overflow", "auto");

            graphical_model.set_model_view(model_view);
            graphical_model.set_source_view(source_view);

            control_view_ = main_view
                .append("div")
                .attr("id", "control_view")
                .attr("class", "algorithm_view_component")
                .style("display", "inline-block")
                .style("height", "30%")
                .style("width", "40%");

            setup_control();

            graphical_model.show();

        }

        this.initialize = function()
        {
            graphical_model.initialize();
        }

        this.redraw = function()
        {
            graphical_model.update();
        }

        this.disable_step_forward = function()
        {
            control_view_.select("#forward_button")
                        .attr("disabled", "true");
        }

    }

    var user_interface_ = new user_interface();

    return user_interface_;

});