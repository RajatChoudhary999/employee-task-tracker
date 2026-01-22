-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" public."enum_users_role" DEFAULT 'employee'::enum_users_role NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.tasks definition

-- Drop table

-- DROP TABLE public.tasks;

CREATE TABLE public.tasks (
	id serial4 NOT NULL,
	title varchar(255) NOT NULL,
	description text NULL,
	status public."enum_tasks_status" DEFAULT 'pending'::enum_tasks_status NOT NULL,
	due_date timestamptz NOT NULL,
	assigned_to int4 NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT tasks_pkey PRIMARY KEY (id),
	CONSTRAINT tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);