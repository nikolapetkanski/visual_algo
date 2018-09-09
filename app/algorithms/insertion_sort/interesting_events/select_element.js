define([
    "algorithms/insertion_sort/interesting_events/select_element", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function select_element(line, pos)
    {
        this.set_line(line);

        this.pos_ = pos;

        this.apply = function(model_interface_)
        {
            var main_array = model_interface_.get_array(0);
            var aux_array = model_interface_.get_array(1);

            aux_array.get_element(this.pos_)
                    .set_value(
                        main_array.get_element(this.pos_)
                            .get_value());

            main_array.get_element(this.pos_)
                        .set_value(null);

        }

    }

    select_element.prototype = new interesting_event();

    return select_element;

});