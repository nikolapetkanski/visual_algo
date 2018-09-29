define([
    "algorithms/ie_common/swap_elements", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function swap_elements(line, a, b)
    {
        this.set_line(line);

        this.a_ = a;
        this.b_ = b;

        this.apply = function(model_interface_)
        {
            var arr = model_interface_.get_array(0);

            var a = arr.get_element(this.a_);
            var b = arr.get_element(this.b_);

            var value = a.get_value();

            a.set_value(b.get_value());
            b.set_value(value);
        }

    }

    swap_elements.prototype = new interesting_event();

    return swap_elements;

})