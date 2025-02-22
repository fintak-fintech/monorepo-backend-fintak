import helmet from 'helmet'

export const helmetInit = (app: any) => {
  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'example.com'], // TODO: replace 'example.com' for domains consumes this API
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  )
  app.use(helmet.dnsPrefetchControl({ allow: false }))
  // app.use(helmet.expectCt({ maxAge: 86400 }));
  app.use(helmet.frameguard({ action: 'deny' }))
  app.use(helmet.hidePoweredBy())
  app.use(
    helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true })
  )
  app.use(helmet.ieNoOpen())
  app.use(helmet.noSniff())
  app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }))
  app.use(helmet.referrerPolicy({ policy: 'no-referrer' }))
  app.use(helmet.xssFilter())

  return app
}
