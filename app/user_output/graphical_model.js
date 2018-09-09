define([
    "user_output/graphical_model",
    "user_output/state_model",
    "user_output/algorithm_source"], 
function(graphical_model, state_model, algorithm_source){

    function graphical_model(d3, parent)
    {

        var d3_ = null;

        var state_model_ = new state_model();
        var algorithm_source_ = new algorithm_source();

        this.set_d3 = function(d3)
        {
            d3_ = d3;
            state_model_.set_d3(d3_);
            algorithm_source_.set_d3(d3);
        }

        this.set_model_view = function(mv)
        {
            state_model_.set_model_view(mv);
        }

        this.set_source_view = function(sv)
        {
            algorithm_source_.set_source_view(sv);
        }

        this.set_IE_interface = function(ie)
        {
            algorithm_source_.set_IE_interface(ie);
            state_model_.set_IE_interface(ie);
        }

        this.show = function()
        {
            state_model_.show();
            algorithm_source_.show();
        }

        this.initialize = function()
        {
            state_model_.initialize();
            algorithm_source_.render_code();
            algorithm_source_.update_code();
        }

        this.update = function()
        {
            state_model_.update_model();
            algorithm_source_.update_code();
        }

    }

    var graphical_model_ = new graphical_model();

    return graphical_model_;

});