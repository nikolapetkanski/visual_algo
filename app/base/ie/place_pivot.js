define(["base/ie/place_pivot", "base/ie/interesting_event"], function(x, interesting_event){

    function place_pivot(line, ppos, pdes)
    {
        this.set_line(line);

        this.ppos_ = ppos;
        this.pdes_ = pdes;

        this.apply = function(model_interface_)
        {
            model_interface_.move_element(2, this.ppos_, 1, this.ppos_);
            model_interface_.set_selected(1, this.ppos_, "blue");
            model_interface_.swap_elements(this.ppos_, this.pdes_);
            model_interface_.set_selected(0, this.pdes_);
        }

    }


    place_pivot.prototype = new interesting_event();

    return place_pivot;

});