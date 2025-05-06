import {CommentsProcess} from '@/types/state.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants/constants.ts';
import {addCommentAction, fetchCommentsAction} from '@/store/api-actions.ts';

const initialState: CommentsProcess = {
  comments: [],
  countComments: 0,
  isCommentsLoading: false,
  isReviewLoading: false,
  error: null,
};


export const commentsDataSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.countComments = action.payload.length;
        state.isCommentsLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsLoading = false;
        state.error = 'Ошибка загрузки';
      })
      .addCase(addCommentAction.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments.splice(0, 0, action.payload);
        state.countComments++;
        state.isReviewLoading = false;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.isReviewLoading = false;
        state.error = 'Ошибка загрузки';
      });
  }
});
