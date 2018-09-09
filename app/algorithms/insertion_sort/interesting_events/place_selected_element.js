define([
    "algorithms/insertion_sort/interesting_events/place_selected_element", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function place_selected_element(line, pos)
    {
        this.set_line(line);

        this.pos_ = pos;

        this.apply = function(model_interface_)
        {
            
            var array = model_interface_.get_array(1);

            var cpos = array.get_element(this.pos_);

            array = model_interface_.get_array(0);

            var npos = array.get_element(this.pos_);

            npos.set_value(cpos.get_value());
            // npos.set_color("rgb(255,0,0)");

            cpos.set_value(null);
            // cpos.set_color("rgb(0,0,0)");

        }

    }

    place_selected_element.prototype = new interesting_event();

    return place_selected_element;

});