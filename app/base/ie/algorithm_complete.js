define(["base/ie/algorithm_complete", "base/ie/interesting_event"], function(x, interesting_event){

    function algorithm_complete()
    {
        this.set_line(-1);

        this.apply = function(model_interface_)
        {
        }

    }

    algorithm_complete.prototype = new interesting_event();

    return algorithm_complete;

});