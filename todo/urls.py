from django.urls import include, path
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("todos/<int:todo_id>/toggle-status",
         toggle_todo_status, name="toggle_status")
]
