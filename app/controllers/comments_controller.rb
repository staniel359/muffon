class CommentsController < ApplicationController
  def create
    @comment = current_profile.comments.create(comment_params)
    respond_with_js
  end

  def destroy
    comment
    @comment&.destroy
    respond_with_js
  end

private

  def comment_params
    params.require(:comment).permit(
      :content, :commentable_type, :commentable_id
    )
  end

  def comment
    @comment = current_profile.comments.find_by(
      id: params[:comment_id]
    )
  end
end
