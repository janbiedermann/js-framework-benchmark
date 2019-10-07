class BenchmarkApp < React::PureComponent::Base

  A = %w[pretty large big small tall short long handsome plain quaint clean elegant easy angry crazy
         helpful mushy odd unsightly adorable important inexpensive cheap expensive fancy]
  C = %w[red yellow blue green pink brown purple brown white black orange]
  N = %w[table chair house bbq desk car pony cookie sandwich burger pizza mouse keyboard]

  def random(max)
    `Math.round(Math.random() * 1000) % max`
  end

  def init_next_id
    @next_id ||= 0
  end

  def build_data(count)
    (0...count).map do
      { id: @next_id += 1, label: "#{A[random(A.size)]} #{C[random(C.size)]} #{N[random(N.size)]}" }
    end
  end

  state.data = []
  state.selected = 0

  def run
    set_state({ data: build_data(1000), selected: 0 })
  end

  def run_lots
    set_state({ data: build_data(10000), selected: 0 })
  end

  def add
    set_state({ data: state.data + build_data(1000), selected: state.selected })
  end

  def update
    data = state.data
    (0...data.size).step(10).each do |i|
      item = data[i]
      data[i] = { id: item[:id], label: item[:label] + ' !!!' }
    end
    force_update
  end

  def select(item)
    state.selected = item[:id]
  end

  def remove(item)
    data = state.data
    data.delete(item)
    force_update
  end

  def clear
    set_state({ data: [], selected: 0 })
  end

  def swap_rows
    data = state.data
    if data.length > 998
      temp = data[1]
      data[1] = data[998]
      data[998] = temp
    end
    force_update
  end

  render do
    init_next_id
    DIV(class_name: "container") do
      Jumbotron(run: method(:run), run_lots: method(:run_lots), add: method(:add), update: method(:update),
                clear: method(:clear), swap_rows: method(:swap_rows))
      @select_method ||= method(:select)
      @remove_method ||= method(:remove)
      s = state.selected
      TABLE(class_name: "table table-hover table-striped test-data") do
        TBODY do
          state.data.each do |item|
            id = item[:id]
            Row(key: id, item: item, selected: (s == id), select: @select_method, remove: @remove_method)
          end
        end
      end
      SPAN(class_name: "preloadicon glyphicon glyphicon-remove", aria_hidden: "true")
    end
  end
end
