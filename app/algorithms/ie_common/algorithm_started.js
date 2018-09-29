define([
    "algorithms/ie_common/algorithm_started", 
    "base/ie/interesting_event"], 
function(x, interesting_event){

    function algorithm_started(data)
    {
        this.set_line(-1);
        this.data_ = data;

        this.apply = function(model_interface_)
        {
            var arr = model_interface_.get_array(0);

            for(var i = 0 ; i < this.data_.length ; i++)
            {
                var e = arr.get_element(i);
                e.set_value(this.data_[i]);
            }            
        }

    }

    algorithm_started.prototype = new interesting_event();

    return algorithm_started;

});