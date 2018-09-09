class LabelsController < ApplicationController
  def index
    set_labels
    set_title
  end

  def show
    set_label
    set_title
  end

private

  def set_title
    @title = t(
      "labels.#{params[:action]}",
      label: @label&.name
    )
  end

  def set_label
    @label = Label.with(name: params[:label_name]).first
  end

  def set_labels
    @labels = paginate(Label.all, 20)
  end
end
