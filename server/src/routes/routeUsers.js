import {
    getUsers,
    getUser,
    addNewUser,
    updateUsers,
    deleteUsers,
    getMe,
    requestPasswordReset,
    resetPassword
} from '../controller/controllerUsers';
import auth from '../middleware/auth';

const routeUsers = (app) => {
    app.route('/me')
        .get(auth, getMe)
    app.route('/users')
      /**
       * @api {get} /users/ Get all users
       * @apiName getUsers
       * @apiError 400 Unable to access the server
       * @apiGroup User
       *
       * @apiSuccess (200) {String} firstName Firstname of the user.
       * @apiSuccess (200) {String} lastName Lastname of the user.
       * @apiSuccess (200) {String} email Email of the user.
       * @apiSuccess (200) {Date} created_at Creation date.
       * @apiSuccess (200) {Date} updated_at Update date.
       * @apiSuccess (200) {ObjectId} _id Unique id.
       */
      .get(getUsers)
        /**
         * @api {post} /users/ Add new user
         * @apiName addNewUser
         * @apiError 400 Server error
         * @apiGroup User
         *
         * @apiParam {String} firstName firstName of the user.
         * @apiParam {String} lastName lastName of the user.
         * @apiParam {String} email Email of the user.
         * @apiParam {String} password Password of the user.
         *
         * @apiSuccess (201) {ObjectId} _id Unique user id.
         * @apiSuccess (201) {String} firstname firstName of the user.
         * @apiSuccess (201) {String} lastName lastName of the user.
         * @apiSuccess (201) {String} email Email of the user.
         * @apiSuccess (201) {String} password Password of the user.
         */
      .post(addNewUser);
    app.route('/users/:id')
      /**
       * @api {get} /user/:id Request a user with id
       * @apiName getUser
       * @apiError 404 User not found
       * @apiGroup User
       *
       * @apiParam {String} id Users unique ID.
       *
       * @apiSuccess (200) {String} firstName Firstname of the user.
       * @apiSuccess (200) {String} lastName Lastname of the user.
       * @apiSuccess (200) {String} email Email of the user.
       * @apiSuccess (200) {Date} created_at Creation date.
       * @apiSuccess (200) {Date} updated_at Update date.
       * @apiSuccess (200) {ObjectId} _id Unique id.
       */
      .get(getUser)
      /**
       * @api {put} /user/:id Update a user with id
       * @apiName updateUser
       * @apiError 400 User not found
       * @apiGroup User
       *
       * @apiParam {String} firstname firstName of the user.
       * @apiParam {String} lastName lastName of the user.
       * @apiParam {String} email Email of the user.
       * @apiParam {String} password Password of the user.
       *
       * @apiSuccess (200) {String} firstName Firstname of the user.
       * @apiSuccess (200) {String} lastName Lastname of the user.
       * @apiSuccess (200) {String} email Email of the user.
       * @apiSuccess (200) {Date} created_at Creation date.
       * @apiSuccess (200) {Date} updated_at Update date.
       * @apiSuccess (200) {ObjectId} _id Unique id.
       */
      .put(updateUsers)
        /**
         * @api {delete} /user/:id Delete a user.
         * @apiName deleteCompany
         * @apiError 404 Bad request
         * @apiGroup User
         *
         * @apiParam {String} id User unique ID.
         *
         * @apiSuccess (200) {Number} n number of user deleted.
         * @apiSuccess (200) {Number} ok Delete is ok.
         */
      .delete(deleteUsers);
    app.route('/request/')
      .post(requestPasswordReset);
    app.route('/reset/:token')
      .post(resetPassword);
}

export default routeUsers;
