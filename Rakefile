require 'bundler'

BENCHDIRS = %w[non-keyed]
ISOBENCHES = %w[lucid-func-react lucid-react material-func-react material-react func-react memo-react nervjs preact react]

task :default => [:update_gems_and_npms_and_build, :run_benches_and_build_results_table]

task :update_gems_and_npms_and_build do
  pwd = Dir.pwd
  BENCHDIRS.each do |b|
    ISOBENCHES.each do |i|
      isoname = "isomorfeus-#{i}"
      dirname = File.join('frameworks', b, isoname, 'src')
      puts dirname
      Dir.chdir(File.join('frameworks', b, isoname, 'src'))

      Bundler.with_original_env do
        if isoname.end_with?('-nervjs')
          system('yarn add nervjs')
        elsif isoname.end_with?('-preact')
          system('yarn add preact')
          system('yarn add preact-compat')
        elsif isoname.end_with?('-react')
          system('yarn add react')
          system('yarn add react-dom')
        end
        system('bundle update')
        system('yarn run production_build')
      end
      Dir.chdir(pwd)
    end
  end
end

task :run_benches_and_build_results_table do
  puts "bench server must be already running"
  pwd = Dir.pwd
  Dir.chdir('webdriver-ts')
  system('npm run bench -- --chromeBinary /Applications/Chromium.app/Contents/MacOS/Chromium')
  system('npm run results')
  Dir.chdir(pwd)
end
