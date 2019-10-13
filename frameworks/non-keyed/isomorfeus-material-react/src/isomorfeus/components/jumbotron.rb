class Jumbotron < LucidMaterial::Component::Base
  render do
    DIV(class_name: "jumbotron") do
      DIV(class_name: "row") do
        DIV(class_name: "col-md-6") do
          H1 "Isomorfeus LucidMaterial React non-keyed"
        end
        DIV(class_name: "col-md-6") do
          DIV(class_name: "row") do
            Button(id: "run", title: "Create 1,000 rows", cb: props.run)
            Button(id: "runlots", title: "Create 10,000 rows", cb: props.run_lots)
            Button(id: "add", title: "Append 1,000 rows", cb: props.add)
            Button(id: "update", title: "Update every 10th row", cb: props.update)
            Button(id: "clear", title: "Clear", cb: props.clear)
            Button(id: "swaprows", title: "Swap Rows", cb: props.swap_rows)
          end
        end
      end
    end
  end
end
