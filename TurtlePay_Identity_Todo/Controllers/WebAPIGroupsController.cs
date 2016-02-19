using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using TurtlePay_Identity_Todo.Models;

namespace TurtlePay_Identity_Todo.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. 
    Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using TurtlePay_Identity_Todo.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Group>("WebAPIGroups");
    builder.EntitySet<GroupType>("GroupTypes"); 
    builder.EntitySet<Organisation>("Organisations"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class WebAPIGroupsController : ODataController
    {
        private turtlepayEntities db = new turtlepayEntities();

        // GET: odata/WebAPIGroups
        [EnableQuery]
        public IQueryable<Group> GetWebAPIGroups()
        {
            return db.Groups;
        }

        // GET: odata/WebAPIGroups(5)
        [EnableQuery]
        public SingleResult<Group> GetGroup([FromODataUri] int key)
        {
            return SingleResult.Create(db.Groups.Where(group => group.GroupID == key));
        }

        // PUT: odata/WebAPIGroups(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Group> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Group group = db.Groups.Find(key);
            if (group == null)
            {
                return NotFound();
            }

            patch.Put(group);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(group);
        }

        // POST: odata/WebAPIGroups
        public IHttpActionResult Post(Group group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Groups.Add(group);
            db.SaveChanges();

            return Created(group);
        }

        // PATCH: odata/WebAPIGroups(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Group> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Group group = db.Groups.Find(key);
            if (group == null)
            {
                return NotFound();
            }

            patch.Patch(group);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(group);
        }

        // DELETE: odata/WebAPIGroups(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Group group = db.Groups.Find(key);
            if (group == null)
            {
                return NotFound();
            }

            db.Groups.Remove(group);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/WebAPIGroups(5)/Groups1
        [EnableQuery]
        public IQueryable<Group> GetGroups1([FromODataUri] int key)
        {
            return db.Groups.Where(m => m.GroupID == key).SelectMany(m => m.Groups1);
        }

        // GET: odata/WebAPIGroups(5)/Group1
        [EnableQuery]
        public SingleResult<Group> GetGroup1([FromODataUri] int key)
        {
            return SingleResult.Create(db.Groups.Where(m => m.GroupID == key).Select(m => m.Group1));
        }

        // GET: odata/WebAPIGroups(5)/GroupType1
        [EnableQuery]
        public SingleResult<GroupType> GetGroupType1([FromODataUri] int key)
        {
            return SingleResult.Create(db.Groups.Where(m => m.GroupID == key).Select(m => m.GroupType1));
        }

        // GET: odata/WebAPIGroups(5)/Organisation
        [EnableQuery]
        public SingleResult<Organisation> GetOrganisation([FromODataUri] int key)
        {
            return SingleResult.Create(db.Groups.Where(m => m.GroupID == key).Select(m => m.Organisation));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GroupExists(int key)
        {
            return db.Groups.Count(e => e.GroupID == key) > 0;
        }
    }
}
