require.config({
  paths: {
    d3: "https://d3js.org/d3.v4.min"
  }
});

require(["d3", 
"algorithm_config", 
"active_algorithm",
"base/control",
"user_output/user_interface",
"user_events"], 
function(d3, algorithm_config, active_algorithm, control, user_interface, user_events) {

    function on_algorithm_selected(id, data)
    {
        // TODO: check user input validity

        algorithm_config.hide();

        active_algorithm.initialize(id);

        user_interface.set_d3(d3);
        user_interface.set_IE_interface(
          active_algorithm.get_IE_interface());

        user_interface.set_on_start(user_events.start_requested);
        user_interface.set_on_stop(user_events.stop_requested);
        user_interface.set_on_step_forward(user_events.step_forward_requested);
        user_interface.set_on_restart(user_events.restart_requested);

        control.set_step_interface(active_algorithm.get_step_interface());
        control.set_draw_interface(user_interface.get_draw_interface());

        user_events.set_commands_interface(control.get_commands_interface());
        user_events.set_data_interface(active_algorithm.get_data_interface());
        user_events.set_data(data);

        user_interface.show();

        user_events.initialize_requested();
    }

    function start_selection() {

      algorithm_config.set_algorithms_list(["Insertion Sort", "Quick Sort"]);
      algorithm_config.set_d3(d3);
      algorithm_config.set_on_algorithm_selected(on_algorithm_selected);

      algorithm_config.show();

    }

    start_selection();

});