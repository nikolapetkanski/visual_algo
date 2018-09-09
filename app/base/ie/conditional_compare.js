define(["base/ie/conditional_compare", "base/ie/interesting_event"], function(x, interesting_event){

    function conditional_compare(line, cond, pos)
    {
        this.set_line(line);

        this.cond_ = cond;
        this.pos_ = pos;

        this.apply = function(model_interface_)
        {
        }

    }

    conditional_compare.prototype = new interesting_event();

    return conditional_compare;

});