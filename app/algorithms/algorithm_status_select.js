define([
    "algorithms/algorithm_status_select",
    "algorithms/insertion_sort/insertion_sort_status",
    "algorithms/quick_sort_status"], 
function(algorithm_status_select, insertion_sort_status, quick_sort_status)
{

    var constructors = {
        "Insertion Sort" : insertion_sort_status,
        "Quick Sort" : quick_sort_status,
    };

    function algorithm_status_select()
    {
        this.new_status = function(id)
        {
            var constructor = constructors[id];
            if(!constructor)
                throw "Undefined id";
            
            return new constructor;
        }
    }

    var algorithm_status_select_ = new algorithm_status_select();

    return algorithm_status_select_;
});