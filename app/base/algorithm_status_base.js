define(function()
{

    function algorithm_status_base(source_text)
    {

        this.source_text_ = source_text;

        this.get_IE_interface = function()
        {
            return this;
        }

        this.user_data_ = null;

        this.on_data = function(data)
        {
            this.user_data_ = data;
        }

        this.get_data = function()
        {
            return this.user_data_;
        }

        this.ie_list_ = new Array();

        this.on_interesting_event = function(ie)
        {
            this.ie_list_.push(ie);
        }

        this.get_source_text = function()
        {
            return this.source_text_;
        }

        this.get_current_line = function()
        {
            return this.ie_list_[0].get_line();
        }

        this.current_ie_ = null;

        this.execute_step = function()
        {
            this.current_ie_ = this.ie_list_.shift();
        }

        this.get_current_IE = function()
        {
            return this.current_ie_;
        }

        this.more_steps = function()
        {
            return this.ie_list_.length > 1;
        }

    }

    return algorithm_status_base;

});