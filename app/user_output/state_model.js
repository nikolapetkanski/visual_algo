define([
    "user_output/state_model", 
    // "user_output/sequence_model",
    "user_output/array_model",
    "user_output/element_model"], 
function(x, array_model, element_model)
{

    function state_model()
    {
        var d3_ = null;

        this.set_d3 = function(d3)
        {
            d3_ = d3;
        }

        var ie_ = null;

        this.set_IE_interface = function(ie)
        {
            ie_ = ie;
        }

        var model_view_ = null;

        this.set_model_view = function(mv)
        {
            model_view_ = mv;
        }

        var model_svg_ = null;

        var sm_ = null;

        var arrays_ = [];

        this.initialize = function()
        {
            var bb = model_svg_.node().getBoundingClientRect();
            
            var md = ie_.get_model_definition();

            var width = bb.width;
            var height = bb.height / md.array_count;

            var cy = bb.height - height;
            var cx = 0;

            for(var i = 0 ; i < md.array_count ; i++)
            {
                var array = new array_model(
                    model_svg_, cx, cy, width, height, 
                    md.data_length, md.max_element, "array_"+i);

                arrays_.push(array);
                cy = cy - height;
            }
        }

        this.show = function()
        {
            model_svg_ = model_view_
                .append("svg")
                .attr("id", "model_svg")
                .attr("class", "svg");
        }

        this.update_model = function()
        {
            var interesting_event = ie_.get_current_IE();
            interesting_event.apply(this);
        }

        this.get_array = function(p)
        {
            return arrays_[p];
        }

    }

    return state_model;

})