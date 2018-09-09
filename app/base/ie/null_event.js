define(["base/ie/null_event", "base/ie/interesting_event"], function(x, interesting_event){

    function null_event(line)
    {
        this.set_line(line);

        this.apply = function(model_interface_)
        {
        }

    }

    null_event.prototype = new interesting_event();

    return null_event;

});