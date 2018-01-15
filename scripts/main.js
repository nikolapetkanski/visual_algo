
require.config({
  paths: {
    d3: "https://d3js.org/d3.v4.min"
  }
});

require(["active_instances", "algorithms"], (active_instances, algorithms)=>{

    var inst = new active_instances();

    inst.add_algorithm(algorithms.new_insertion_sort([6,4,2,7,3,5,1,8,9]));

});