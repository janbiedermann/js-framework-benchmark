class Button < LucidFunc::Base
  def cb_click
    props.cb.call
  end

  render do
    DIV(class_name: "col-sm-6 smallpad") do
      BUTTON(type: "button", class_name: "btn btn-primary btn-block", id: props.id, on_click: :cb_click) { props.title }
    end
  end
end
