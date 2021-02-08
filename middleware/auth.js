export function withAuth () {
  return function auth (
    /** @type {import("express").Request} */ req,
    /** @type {import("express").Response} */ res,
    /** @type {import("express").NextFunction} */ next
  ) {
    if (!req.session.user) {
      return res.end({ statusCode: 401, message: 'Authentication Required' })
    }
    next()
  }
}
