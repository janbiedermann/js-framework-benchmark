class BenchmarkApp < LucidMaterial::App::Base

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

  def init_data
    @data ||= []
  end

  def build_data(count)
    (0...count).map do
      { id: @next_id += 1, label: "#{A[random(A.size)]} #{C[random(C.size)]} #{N[random(N.size)]}" }
    end
  end

  attr_accessor :data

  app_store.selected = 0
  app_store.render = 0

  def run
    @data = build_data(1000)
    app_store.selected = 0
    force_update
  end

  def run_lots
    @data = build_data(10000)
    app_store.selected = 0
    force_update
  end

  def add
    @data = @data + build_data(1000)
    force_update
  end

  def update
    (0...@data.size).step(10).each do |i|
      item = @data[i]
      @data[i] = { id: item[:id], label: item[:label] + ' !!!' }
    end
    force_update
  end

  def remove(item)
    @data.delete(item)
    force_update
  end

  def clear
    @data = []
    app_store.selected = 0
    force_update
  end

  def swap_rows
    if @data.length > 998
      temp = @data[1]
      @data[1] = @data[998]
      @data[998] = temp
    end
    force_update
  end

  render do
    init_data
    init_next_id
    DIV(class_name: "container") do
      Jumbotron(run: method(:run), run_lots: method(:run_lots), add: method(:add), update: method(:update),
                clear: method(:clear), swap_rows: method(:swap_rows))
      @remove_method ||= method(:remove)
      @icon ||= gre { SPAN(class_name: "glyphicon glyphicon-remove", aria_hidden: "true") }
      s = app_store.selected
      TABLE(class_name: "table table-hover table-striped test-data") do
        TBODY do
          @data.each do |item|
            id = item[:id]
            Row(item: item, selected: (s == id), remove: @remove_method, icon: @icon)
          end
        end
      end
      SPAN(class_name: "preloadicon glyphicon glyphicon-remove", aria_hidden: "true")
    end
  end
end
