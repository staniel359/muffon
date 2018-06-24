class LabelsController < ApplicationController
  def index
    @page_data = {
      title:  title,
      labels: labels
    }
  end

  def show
    @page_data = {
      title: title,
      label: label
    }
  end

private

  def title
    t(
      "labels.#{params[:action]}",
      label: label&.name
    )
  end

  def label
    @label ||= Label.find_by(name: params[:name])
  end

  def labels
    paginate(Label.all, 20)
  end
end
