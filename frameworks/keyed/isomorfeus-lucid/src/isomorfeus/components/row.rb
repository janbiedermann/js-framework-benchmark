class Row < LucidComponent::Base
  event_handler :on_select do
    app_store.selected = props.item[:id]
  end

  event_handler :on_remove do
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
