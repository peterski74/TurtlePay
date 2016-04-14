using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace TurtlePay_Identity_Todo.Models
{
    public class Groups
    {
        public int Id { get; set; }                    

        [Required, StringLength(maximumLength: 200)]     // Validation rules
        public string GroupName { get; set; }

        public string Description { get; set; }

        public System.DateTime Published_At { get; set; }
        public System.DateTime  JoinLastDay { get; set; }
        public System.DateTime PayLastDay { get; set; }
        public System.DateTime  FirstDayOfActivity { get; set; }
        public int  GroupMaxSize  { get; set; }
        public int  GroupMembersCount  { get; set; }
        public int  GroupMembersPaid  { get; set; }
        public int  GroupMembersOverdue  { get; set; }

        public System.DateTime GroupCreatedDate { get; set; }  // 25 March 2016, 9am 

        public bool Active { get; set; }
        public bool Deleted { get; set; }

    }
}