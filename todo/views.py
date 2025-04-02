from time import timezone
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from todo.models import Todo
from todo.serializers import TodoSerializer
from .filter import TodoFilter

# Create your views here.


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by("-created_at")
    serializer_class = TodoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TodoFilter
    search_fields = ["title", "description"]


@api_view(['PATCH'])
def toggle_todo_status(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id)
        todo.done = True if todo.done == False else False
        todo.completed_at = None if todo.completed_at else datetime.now()
        todo.save()
        return Response(TodoSerializer(todo).data, status=status.HTTP_200_OK)
    except:
        return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)
