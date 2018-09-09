define(["base/ie/return_pivot", "base/ie/interesting_event"], function(x, interesting_event){

    function return_pivot(line, p, pos, r)
    {
        this.set_line(line);

        this.p_ = p;
        this.pos_ = pos;
        this.r_ = r;

        this.apply = function(model_interface_)
        {
            for(var i = this.p_ ; i <= this.r_ ; i++)
            {
                if(i != this.pos_)
                    model_interface_.set_selected(0, i);
            }
            
        }

    }


    return_pivot.prototype = new interesting_event();

    return return_pivot;

});