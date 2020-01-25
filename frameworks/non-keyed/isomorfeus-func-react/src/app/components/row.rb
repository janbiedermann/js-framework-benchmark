class Row < React::FunctionComponent::Base
  def on_select
    props.select.call(props.item)
  end

  def on_remove
    props.remove.call(props.item)
  end

  render do
    item = props.item
    TR(class_name: (props.selected ? "danger" : "")) do
      TD(class_name: "col-md-1") { item[:id] }
      TD(class_name: "col-md-4") { A(on_click: :on_select) { item[:label] }}
      TD(class_name: "col-md-1") { A(on_click: :on_remove) { rre(props.icon) }}
      TD(class_name: "col-md-6")
    end
  end
end
