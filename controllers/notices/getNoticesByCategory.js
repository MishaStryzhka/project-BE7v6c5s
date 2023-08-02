// const getNoticesByCategory = async (req, res, next) => {
//     const { categoryName } = req.params;
//     const { page = 1, limit = 12 } = req.query;
//     const skip = (page - 1) * limit;
  
//     try {
//       const totalHits = await Notice.countDocuments({ category: categoryName });
      
//       const foundNotices = await Notice.find({ category: categoryName })
//         .skip(skip)
//         .limit(limit)
//         .populate("owner", "email phone")
//         .sort({ createdAt: -1 });
    
//       if (foundNotices.length === 0) {
//         return res.status(404).json({
//           message: "Notices for this category not found.",
//         });
//       }
  
//       const notices = foundNotices;
  
//       res.json({ totalHits, notices });
//     } catch (error) {
//       console.error("Error while retrieving notices by category:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  
//   module.exports = getNoticesByCategory
  