define([
    "algorithms/quick_sort/interesting_events/place_pivot", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function place_pivot(line, ppos, pdes)
    {
        this.set_line(line);

        this.ppos_ = ppos;
        this.pdes_ = pdes;

        this.apply = function(model_interface_)
        {
            var celem = model_interface_.get_array(1).get_element(this.ppos_);
            var delem = model_interface_.get_array(0).get_element(this.ppos_);

            var value = celem.get_value();
            celem.set_value(delem.get_value());
            delem.set_value(value);

            var a = model_interface_.get_array(0).get_element(this.ppos_);
            var b = model_interface_.get_array(0).get_element(this.pdes_);

            value = a.get_value();
            a.set_value(b.get_value());
            b.set_value(value);
        }

    }


    place_pivot.prototype = new interesting_event();

    return place_pivot;

});