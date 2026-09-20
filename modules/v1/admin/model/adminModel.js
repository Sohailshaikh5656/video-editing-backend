let database = require("../../../../configure/database");
let responseCode = require("../../../../utilities/responseCode");
const jwt = require("jsonwebtoken");
const activeUrl = `is_active = 1 AND is_deleted = 0`;

class AdminModel {
  constructor() {}

  async login(requestData) {
    try {
      let data = {
        username: requestData.username,
        password: requestData.password,
      };

      let query = `SELECT * FROM tbl_admin WHERE username = ? AND password = ? AND ${activeUrl};`;
      const [result] = await database.query(query, [
        data.username,
        data.password,
      ]);
      if (result.length <= 0) {
        return {
          code: responseCode.NO_DATA_FOUND,
          keyword: "invalid_credentials",
          data: null,
        };
      }

      let token = jwt.sign({ admin_id: result[0].id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return {
        code: responseCode.SUCCESS,
        keyword: "login_success",
        data: {
          username: result[0].username,
          logintime: new Date().toISOString(),
          token: token,
        },
      };
    } catch (err) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: err,
      };
    }
  }

  async uploadFile(requestData) {
    try {
      console.log("File Uploads Called !");
      console.log("File Name : ", requestData?.file);
      if (!requestData?.file) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "file_upload_failed",
          data: null,
        };
      } else {
        return {
          code: responseCode.SUCCESS,
          keyword: "file_upload_success",
          data: requestData.file.filename,
        };
      }
    } catch (error) {
      console.error("Upload File Error:", error);
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "file_upload_failed",
        data: error,
      };
    }
  }

  async createVedioTag(requestData) {
    try {
      let data = {
        tags: requestData.tag,
      };
      let query = `INSERT INTO tbl_vedio_tags SET ?`;
      let [result] = await database.query(query, data);
      if (!result.affectedRows || result.affectedRows === 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "no_row_affected",
          data: null,
        };
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "vedio_tag_created",
        data: {
          id: result.insertId,
          tag: data.tag,
        },
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async tags(requestData) {
    try {
      let query = `SELECT * FROM tbl_vedio_tags WHERE is_deleted = 0`;
      if (requestData.id) {
        query += ` AND id = ${requestData.id}`;
      } else if (requestData.search) {
        query += ` AND tags LIKE '%${requestData.search}%'`;
      }
      let [result] = await database.query(query);
      if (result.length <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "no_tags_found",
          data: null,
        };
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "tags_found",
        data: requestData.id && result.length > 0 ? result[0] : result,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: err,
      };
    }
  }

  async enableDisableTag(requestData) {
    try {
      let data = {
        id: requestData.id,
        is_active: requestData.status,
      };

      let query = `UPDATE tbl_vedio_tags SET is_active = ? WHERE id = ? AND is_deleted = 0`;
      let [result] = await database.query(query, [data.is_active, data.id]);

      if (result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_update_tag_status",
          data: null,
        };
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "tag_status_updated",
        data: { id: data.id, is_active: data.is_active },
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async updateTags(requestData) {
    try {
      let data = {
        id: requestData.id,
        tags: requestData.tag,
      };

      let query = `UPDATE tbl_vedio_tags SET tags = ? WHERE id = ? AND id_deleted = 0`;
      let [result] = await database.query(query, [data.tags, data.id]);
      if (!result.affectedRows) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_update_tag",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "tag_updated",
        data: { id: data.id, tag: data.tags },
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async deleteTags(requestData) {
    try {
      let id = requestData.id;

      let query = `UPDATE tbl_vedio_tags SET is_deleted = 1 WHERE id = ?`;
      let [result] = await database.query(query, [id]);

      if (!result.affectedRows) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_delete_tag",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "tag_deleted",
        data: { id },
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  //Vedios Model
  async createVedios(requestData) {
    try {
      let vedios = {
        vedio_url: requestData.vedio_url,
        title: requestData.title,
        name: requestData.name,
        description: requestData.description,
      };

      if (requestData.views) {
        vedios.views = requestData.views;
      }
      if (requestData.thumbnail_url) {
        vedios.thumbnail_url = requestData.thumbnail_url;
      }
      if (requestData.cuts) {
        vedios.cuts = requestData.cuts;
      }
      if (requestData.is_home_screen) {
        vedios.is_home_screen = requestData.is_home_screen;
      }

      let [result] = await database.query(
        `INSERT INTO  tbl_vedios SET ?`,
        vedios,
      );
      if (!result.affectedRows) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_create_vedio",
          data: null,
        };
      }

      // The error occurs because the result returned by the INSERT query is not an array,
      // but an object where 'insertId' is a direct property. So accessing result[0]?.insertId is incorrect.
      // The correct way is:
      let vedio_id = result?.insertId;
      let query = `INSERT INTO tbl_vedio_tag_junction SET ?`;
      console.log("Array : ", requestData.tags);
      for (let i = 0; i < requestData.tags.length; i++) {
        let data = {
          vedio_id: vedio_id,
          vedio_tag_id: requestData.tags[i],
        };

        await database.query(query, data);
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "vedio_created_successfully",
        data: null,
      };
    } catch (error) {
      console.log("error", error);
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async getAllVedios(requestData) {
    try {
      // Build base query
      let query = `SELECT v.*, (
        SELECT GROUP_CONCAT(vt.tags SEPARATOR ', ')
        FROM tbl_vedio_tags AS vt
        INNER JOIN tbl_vedio_tag_junction AS vtj ON vtj.vedio_tag_id = vt.id
        WHERE vtj.vedio_id = v.id
        ) AS category
        FROM tbl_vedios AS v
        WHERE is_deleted = 0`;

      // If specific id, add as filter
      if (requestData.id) {
        query += ` AND v.id = ${database.escape(requestData.id)}`;
      }

      // If search, add to where clause
      if (requestData.search) {
        let searchEscaped = database.escape("%" + requestData.search + "%");
        query += ` AND (v.name LIKE ${searchEscaped} OR v.title LIKE ${searchEscaped})`;
      }

      // Order descending by created at/id (or fallback)
      query += ` ORDER BY v.id DESC`;

      let [result] = await database.query(query);
      console.log("Result : ", result);

      if (!Array.isArray(result) || result.length <= 0) {
        return {
          code: responseCode.NOT_FOUND,
          keyword: "no_vedios_found",
          data: [],
        };
      }

      result = result.map((item) => {
        return {
          ...item,
          category: item.category.split(",").map((cat) => cat.trim()),
        };
      });

      return {
        code: responseCode.SUCCESS,
        keyword: "vedios_fetched_successfully",
        data: result,
      };
    } catch (error) {
      // Return error message only, not the whole error object, to avoid circular structure error
      console.log(error);
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        error: error.message || "Unknown error",
      };
    }
  }
  async updateVedios(requestData) {
    try {
      let vedios = {
        vedio_url: requestData.vedio_url,
        title: requestData.title,
        name: requestData.name,
        description: requestData.description,
      };

      if (requestData.views) {
        vedios.views = requestData.views;
      }
      if (requestData.thumbnail_url) {
        vedios.thumbnail_url = requestData.thumbnail_url;
      }
      if (requestData.cuts) {
        vedios.cuts = requestData.cuts;
      }
      if (requestData.is_home_screen) {
        vedios.is_home_screen = requestData.is_home_screen;
      }

      console.log("Id : ", requestData);
      let vedio_id = requestData.id;

      let [result] = await database.query(
        `UPDATE  tbl_vedios SET ? WHERE id = ?`,
        [vedios, requestData.id],
      );
      if (!result.affectedRows) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_update_vedio",
          data: null,
        };
      }

      await database.query(
        `DELETE FROM tbl_vedio_tag_junction WHERE vedio_id = ? AND vedio_tag_id not in (?)`,
        [vedio_id, requestData.tags],
      );
      let query = `INSERT INTO tbl_vedio_tag_junction SET ?`;
      console.log("Array : ", requestData.tags);
      for (let i = 0; i < requestData.tags.length; i++) {
        let data = {
          vedio_id: vedio_id,
          vedio_tag_id: requestData.tags[i],
        };
        let [check] = await database.query(
          `SELECT * FROM tbl_vedio_tag_junction WHERE vedio_id = ? AND  vedio_tag_id = ?`,
          [data.vedio_id, data.vedio_tag_id],
        );
        if (check.length <= 0) await database.query(query, data);
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "vedio_updated_successfully",
        data: null,
      };
    } catch (error) {
      console.log("error", error);
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async deleteVedios(requestData) {
    try {
      let [result] = await database.query(
        `UPDATE tbl_vedios SET is_deleted = 1 WHERE id = ?`,
        [requestData.id],
      );
      if (!result.affectedRows && result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_delete_vedio",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "vedio_deleted_successfully",
        data: null,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  //Process

  async createProcess(requestData) {
    try {
      let data = {
        title: requestData.title,
        description: requestData.description,
        points: requestData.points,
      };

      if (requestData.is_home_screen) {
        data.is_home_screen = requestData.is_home_screen;
      }

      let [result] = await database.query(
        `INSERT INTO tbl_process SET ?`,
        data,
      );
      if (result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_create_process",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "process_created_successfully",
        data: null,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async getProcess(requestData){
    try{
      let query = `SELECT * FROM tbl_process WHERE is_deleted = 0`
      if(requestData.id){
        query += ` AND id = ${requestData.id}`
      }else if(requestData.search){
        query += ` AND title LIKE %${requestData.search}%`
      }
      query += " ORDER BY DESC"

      let [result] = await database.query(query)
      if(result.length <=0){
        return {
          code: responseCode.DATA_NOT_FOUND,
          keyword: "no_process_found",
          data: [],
        };
      }

    return {
      code: responseCode.SUCCESS,
      keyword: "process_fetched_successfully",
      data: requestData.id ? result[0] : result, 
    };
    }catch(error){
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async updateProcess(requestData){
    try {
      let data = {
        title: requestData.title,
        description: requestData.description,
        points: requestData.points,
      };

      if (requestData.is_home_screen) {
        data.is_home_screen = requestData.is_home_screen;
      }

      let [result] = await database.query(
        `UPDATE tbl_process SET ? WHERE id = ?`,
        [data, requestData.id],
      );
      if (result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_update_process",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "process_updated_successfully",
        data: null,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async deleteProcess(requestData) {
    try {
      let [result] = await database.query(
        `UPDATE tbl_process SET is_deleted = 1 WHERE id = ?`,
        [requestData.id],
      );
      if (!result.affectedRows && result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_delete_process",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "process_deleted_successfully",
        data: null,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  //Reviews

  async createReview(requestData) {
    try {
      let data = {
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        message: requestData.message,
        rating: requestData.rating,
        occupation : requestData.occupation,
        state : requestData.state,
        country : requestData.country,
        role : requestData.role,
      };



      if (requestData.retained) {
        data.retained = requestData.retained;
      }

      let [result] = await database.query(
        `INSERT INTO tbl_testimonials SET ?`,
        data,
      );
      if (result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_create_testimonials",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "testimonials_created_successfully",
        data: null,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async getReview(requestData){
    try{
      let query = `SELECT * FROM tbl_testimonials WHERE is_deleted = 0`
      if(requestData.id){
        query += ` AND id = ${requestData.id}`
      }else if(requestData.search){
        query += ` AND (first_name LIKE '%${requestData.search}%' OR last_name LIKE '%${requestData.search}%')`
      }
      query += " ORDER BY DESC"

      let [result] = await database.query(query)
      if(result.length <=0){
        return {
          code: responseCode.DATA_NOT_FOUND,
          keyword: "no_testimonials_found",
          data: [],
        };
      }

    return {
      code: responseCode.SUCCESS,
      keyword: "testimonials_fetched_successfully",
      data: requestData.id ? result[0] : result, 
    };
    }catch(error){
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async updateReview(requestData){
    try {
      let data = {
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        message: requestData.message,
        rating: requestData.rating,
        occupation : requestData.occupation,
        state : requestData.state,
        country : requestData.country,
        role : requestData.role,
      };



      if (requestData.retained) {
        data.retained = requestData.retained;
      }

      let [result] = await database.query(
        `UPDATE tbl_testimonials SET ? WHERE id = ?`,
        [data, requestData.id],
      );
      if (result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_update_testimonials",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "testimonials_updated_successfully",
        data: null,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }

  async deleteReview(requestData) {
    try {
      let [result] = await database.query(
        `UPDATE tbl_testimonials SET is_deleted = 1 WHERE id = ?`,
        [requestData.id],
      );
      if (!result.affectedRows && result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "unable_to_delete_testimonials",
          data: null,
        };
      }
      return {
        code: responseCode.SUCCESS,
        keyword: "testimonials_deleted_successfully",
        data: null,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error,
      };
    }
  }
}

module.exports = new AdminModel();
