class Row < LucidComponent::Base
  store_updates :off

  def on_select
    app_store.selected = props.item[:id]
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
