define([
    "active_algorithm",
    "algorithms/algorithm_status_select"], 
function(active_algorithm, algorithm_status_select) 
{

    function active_algorithm()
    {
        var algorithm_status_ = null;

        this.initialize = function(id)
        {
            algorithm_status_ = algorithm_status_select.new_status(id);
        }

        this.get_step_interface = function() 
        {
            return algorithm_status_;
        }

        this.get_IE_interface = function()
        {
            return algorithm_status_.get_IE_interface();
        }

        this.get_data_interface = function()
        {
            return algorithm_status_;
        }

    }

    var active_algorithm_ = new active_algorithm();

    return active_algorithm_;

});