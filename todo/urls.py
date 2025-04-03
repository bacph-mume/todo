from django.urls import include, path
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', TodoViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("<int:todo_id>/toggle-status",
         toggle_todo_status, name="toggle_status")
]
