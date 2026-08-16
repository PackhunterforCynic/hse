import { MetadataRoute } from "next";
import { projectsData } from "@/utils/projectsData";
import { servicesData } from "@/utils/servicesData";
import { coursesData } from "@/utils/coursesData";
import { lessonsData } from "@/utils/lessonsData";
import { eventsData } from "@/utils/eventsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://havilahpro.com";

  // Static routes
  const staticRoutes = [
    "",
    "/projects",
    "/services",

    "/internships",

    "/courses",
    "/lessons",
    "/events",
    "/appointments",
    "/requests",
    "/gallery",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic projects routes
  const projectRoutes = projectsData.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic services routes
  const serviceRoutes = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic courses routes
  const courseRoutes = coursesData.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic lessons routes
  const lessonRoutes = lessonsData.map((l) => ({
    url: `${baseUrl}/lessons/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic events routes
  const eventRoutes = eventsData.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...serviceRoutes,
    ...courseRoutes,
    ...lessonRoutes,
    ...eventRoutes,
  ];
}
