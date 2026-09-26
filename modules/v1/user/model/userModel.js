
let database = require("../../../../configure/database");
let responseCode = require("../../../../utilities/responseCode");

/**
 * Read-only model for the public (user) side of the site.
 *
 * Every getter keeps the same response `keyword`/`data` shape as the admin
 * model, so the existing frontend keeps working — only soft-deleted rows
 * (is_deleted = 1) are hidden. Unlike the admin model, all filters are bound
 * with `?` placeholders instead of string interpolation.
 */
class UserModel {
  constructor() {}

  //Vedio Tags
  async tags(requestData = {}) {
    try {
      let query = `SELECT * FROM tbl_vedio_tags WHERE is_deleted = 0 AND is_active=1`;
      let params = [];

      if (requestData.id) {
        query += ` AND id = ?`;
        params.push(requestData.id);
      } else if (requestData.search) {
        query += ` AND tags LIKE ?`;
        params.push(`%${requestData.search}%`);
      }

      query += " ORDER BY id DESC";

      let [result] = await database.query(query, params);

      if (result.length <= 0) {
        return {
          code: responseCode.NO_DATA_FOUND,
          keyword: "no_tags_found",
          data: null,
        };
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "tags_found",
        data: requestData.id ? result[0] : result,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }

  //Vedios
  async getVideos(requestData = {}) {
    try {
      let query = `SELECT v.*, (
        SELECT GROUP_CONCAT(vt.tags SEPARATOR ', ')
        FROM tbl_vedio_tags AS vt
        INNER JOIN tbl_vedio_tag_junction AS vtj ON vtj.vedio_tag_id = vt.id
        WHERE vtj.vedio_id = v.id
        ) AS category
        FROM tbl_vedios AS v
        WHERE v.is_deleted = 0 AND v.is_active=1`;

      let params = [];

      if (requestData.id) {
        query += ` AND v.id = ?`;
        params.push(requestData.id);
      }

      if (requestData.search) {
        query += ` AND (v.name LIKE ? OR v.title LIKE ?)`;
        params.push(`%${requestData.search}%`, `%${requestData.search}%`);
      }

      query += ` ORDER BY v.id DESC`;

      let [result] = await database.query(query, params);

      if (!Array.isArray(result) || result.length <= 0) {
        return {
          code: responseCode.NO_DATA_FOUND,
          keyword: "no_vedios_found",
          data: [],
        };
      }

      result = result.map((item) => {
        return {
          ...item,
          category: item.category
            ? item.category.split(",").map((cat) => cat.trim())
            : [],
        };
      });

      return {
        code: responseCode.SUCCESS,
        keyword: "vedios_fetched_successfully",
        data: result,
      };
    } catch (error) {
      console.log("getVideos Error : ", error);
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }
  //Process
  async getProcess(requestData = {}) {
    try {
      let query = `SELECT * FROM tbl_process WHERE is_deleted = 0 AND is_active=1`;
      let params = [];

      if (requestData.id) {
        query += ` AND id = ?`;
        params.push(requestData.id);
      } else if (requestData.search) {
        query += ` AND title LIKE ?`;
        params.push(`%${requestData.search}%`);
      }

      query += " ORDER BY id DESC";

      let [result] = await database.query(query, params);

      if (result.length <= 0) {
        return {
          code: responseCode.NO_DATA_FOUND,
          keyword: "no_process_found",
          data: [],
        };
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "process_fetched_successfully",
        data: requestData.id ? result[0] : result,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }

  //Testimonials / Reviews
  async getReviews(requestData = {}) {
    try {
      let query = `SELECT * FROM tbl_testimonials WHERE is_deleted = 0 AND is_active=1`;
      let params = [];

      if (requestData.id) {
        query += ` AND id = ?`;
        params.push(requestData.id);
      } else if (requestData.search) {
        query += ` AND (first_name LIKE ? OR last_name LIKE ?)`;
        params.push(`%${requestData.search}%`, `%${requestData.search}%`);
      }

      query += " ORDER BY id DESC";

      let [result] = await database.query(query, params);

      if (result.length <= 0) {
        return {
          code: responseCode.NO_DATA_FOUND,
          keyword: "no_testimonials_found",
          data: [],
        };
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "testimonials_fetched_successfully",
        data: requestData.id ? result[0] : result,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }

  //Journal Category
  async getJournalCategory(requestData = {}) {
    try {
      let query = `SELECT * FROM tbl_journal_category WHERE is_deleted = 0 AND is_active=1`;
      let params = [];

      if (requestData.id) {
        query += ` AND id = ?`;
        params.push(requestData.id);
      }

      if (requestData.search) {
        query += ` AND name LIKE ?`;
        params.push(`%${requestData.search}%`);
      }

      let [result] = await database.query(query, params);

      return {
        code: responseCode.SUCCESS,
        keyword: "journal_category_fetched_successfully",
        data: result,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }
  //Journal
  async getJournal(requestData = {}) {
    try {
      let query = `SELECT * FROM tbl_journal WHERE is_deleted = 0 AND is_active=1`;
      let params = [];

      if (requestData.id) {
        query += ` AND id = ?`;
        params.push(requestData.id);
      }

      if (requestData.search) {
        query += ` AND title LIKE ?`;
        params.push(`%${requestData.search}%`);
      }

      let [result] = await database.query(query, params);

      return {
        code: responseCode.SUCCESS,
        keyword: "journal_fetched_successfully",
        data: result,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }

  //Reels Category
  async getReelsCategory(requestData = {}) {
    try {
      let query = `SELECT * FROM tbl_reel_category WHERE is_deleted = 0 AND is_active=1`;
      let params = [];

      if (requestData.id) {
        query += ` AND id = ?`;
        params.push(requestData.id);
      }

      if (requestData.search) {
        query += ` AND name LIKE ?`;
        params.push(`%${requestData.search}%`);
      }

      let [result] = await database.query(query, params);

      return {
        code: responseCode.SUCCESS,
        keyword: "reels_category_fetched_successfully",
        data: result,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }

  //Reels
  async getReels(requestData = {}) {
    try {
      let query = `SELECT * FROM tbl_reels WHERE is_deleted = 0 AND is_active=1`;
      let params = [];

      if (requestData.id) {
        query += ` AND id = ?`;
        params.push(requestData.id);
      }

      if (requestData.search) {
        query += ` AND name LIKE ?`;
        params.push(`%${requestData.search}%`);
      }

      let [result] = await database.query(query, params);

      return {
        code: responseCode.SUCCESS,
        keyword: "reels_fetched_successfully",
        data: result,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }
  


  async createContact(requestData) {
    try {
      let data = {
        full_name: requestData.full_name,
        email: requestData.email,
        company: requestData.company,
        timezone: requestData.timezone,
        project_type: requestData.project_type,
        brief: requestData.brief,
        budget: requestData.budget,
        target_date: requestData.target_date,
        footage_url: requestData.footage_url,
        booking_time: requestData.booking_time,
      };

      let query = `INSERT INTO tbl_contact SET ?`;
      let [result] = await database.query(query, data);

      if (result.affectedRows <= 0) {
        return {
          code: responseCode.OPERATION_FAILED,
          keyword: "contact_creation_failed",
          data: "Contact could not be created.",
        };
      }

      return {
        code: responseCode.SUCCESS,
        keyword: "contact_created_successfully",
        data: result.insertId,
      };
    } catch (error) {
      return {
        code: responseCode.OPERATION_FAILED,
        keyword: "something_went_wrong",
        data: error.message || error,
      };
    }
  }
}

module.exports = new UserModel();
